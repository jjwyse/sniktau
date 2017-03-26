import React from 'react';

import {mount} from 'enzyme';
import {expect} from 'chai';

import Map from 'components/Map/Map';

describe('Map', () => {
  it('should render the children of the Map', () => {
    // to ignore the google maps props that are passed down
    const Temp = () => <h1>Foo</h1>;
    const component = mount(
      <Map>
        <Temp />
      </Map>,
    );

    const h1 = component.find('h1');
    expect(h1).to.have.length(1);
    expect(h1.text()).to.equal('Foo');
  });
});
