import { registerRoot } from 'remotion'
import { ProposalVideo } from './compositions/ProposalVideo'
import React from 'react'
import { Composition } from 'remotion'

const Root = () => (
  <Composition
    id="ProposalVideo"
    component={ProposalVideo as React.ComponentType<Record<string, unknown>>}
    durationInFrames={2700}
    fps={30}
    width={1920}
    height={1080}
    defaultProps={{ scenes: [], bgmUrl: '', title: '' }}
  />
)

registerRoot(Root)
