import React from 'react'
import { shallow } from 'enzyme'
import Artists from '../src/components/Artists'

describe ('Testing Artists Component', ()=>{
    it('should render correctly', ()=>{
        const artistsComponent = shallow(
            <Artists />
        )

        expect(artistsComponent).toMatchSnapshot()
    })
})