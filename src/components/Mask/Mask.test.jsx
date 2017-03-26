import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import {mount} from 'enzyme';
import {expect} from 'chai';

import Mask from 'components/Mask/Mask';

describe('Mask', () => {
  it('should not show the name by default', () => {
    const component = mount(
      <MuiThemeProvider>
        <Mask message="Foo" />
      </MuiThemeProvider>,
    );

    const h5 = component.find('h5');
    expect(h5).to.have.length(1);
    expect(h5.text()).to.equal('Foo');
  });
});
