import React from 'react'
import { shallow } from 'enzyme'
import ArtistsAlbumsFilter from '../src/components/ArtistsAlbumsFilter'

describe ('Testing Artists Component', ()=>{
    it('should render correctly', ()=>{
        const wrapper = shallow(
            <ArtistsAlbumsFilter 
                classes={{}}
                artist={''}
                handleChange={()=>{}}
                renderArtists={()=>{}}
                artistAlbums={[]}
                year={''}
                renderYears={()=>{}}
            />
        )

        expect(wrapper).toMatchSnapshot()
    })
})