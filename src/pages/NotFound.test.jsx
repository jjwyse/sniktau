import React from 'react';
import {mount} from 'enzyme';
import {expect} from 'chai';

import NotFound from 'pages/NotFound';

describe('NotFound', () => {
  it('should support rendering the NotFound component', () => {
    const component = mount(<NotFound />);
    expect(component).to.not.be.null;

    const Link = component.find('Link');
    expect(Link).to.have.length(1);
    expect(Link.props().to).to.equal('/');
  });
});
