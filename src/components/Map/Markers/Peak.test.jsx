import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import {mount} from 'enzyme';
import {expect} from 'chai';

import Peak from 'components/Map/Markers/Peak';

describe('Peak', () => {
  it('should not show the name by default', () => {
    const component = mount(
      <MuiThemeProvider>
        <Peak name="Foo" />
      </MuiThemeProvider>,
    );

    const h5 = component.find('h5');
    expect(h5).to.have.length(0);
  });

  it('should show the name on hover', () => {
    const component = mount(
      <MuiThemeProvider>
        <Peak $hover={true} name="Foo" />
      </MuiThemeProvider>,
    );

    const h5 = component.find('h5');
    expect(h5).to.have.length(1);
  });
});
