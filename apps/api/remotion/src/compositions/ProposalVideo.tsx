import React from 'react'
import { Sequence, Audio, Img, useCurrentFrame, interpolate } from 'remotion'

type Scene = {
  imageUrl: string
  narrationUrl: string
  durationFrames: number
  narrationText: string
}

type Props = {
  scenes: Scene[]
  bgmUrl: string
  title: string
}

const SceneComponent: React.FC<{ scene: Scene; startFrame: number }> = ({ scene, startFrame }) => {
  const frame = useCurrentFrame()
  const elapsed = frame - startFrame

  const scale = interpolate(elapsed, [0, scene.durationFrames], [1, 1.08], {
    extrapolateRight: 'clamp'
  })

  const opacity = interpolate(
    elapsed,
    [0, 15, scene.durationFrames - 15, scene.durationFrames],
    [0, 1, 1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  )

  return (
    <div style={{ width: '100%', height: '100%', overflow: 'hidden', position: 'relative', background: '#000' }}>
      <Img
        src={scene.imageUrl}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          transform: `scale(${scale})`,
          opacity
        }}
      />
      <div style={{
        position: 'absolute',
        bottom: 80,
        left: 0,
        right: 0,
        textAlign: 'center',
        color: 'white',
        fontSize: 36,
        fontFamily: 'sans-serif',
        textShadow: '2px 2px 8px rgba(0,0,0,0.8)',
        opacity,
        padding: '0 40px'
      }}>
        {scene.narrationText}
      </div>
    </div>
  )
}

export const ProposalVideo: React.FC<Props> = ({ scenes, bgmUrl, title }) => {
  let currentFrame = 0

  return (
    <>
      {bgmUrl && <Audio src={bgmUrl} volume={0.4} />}
      {scenes.map((scene, i) => {
        const start = currentFrame
        currentFrame += scene.durationFrames
        return (
          <Sequence key={i} from={start} durationInFrames={scene.durationFrames}>
            {scene.narrationUrl && <Audio src={scene.narrationUrl} volume={1} />}
            <SceneComponent scene={scene} startFrame={start} />
          </Sequence>
        )
      })}
    </>
  )
}
