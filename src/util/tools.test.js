import {metersToFeet} from 'util/tools';
import {expect} from 'chai';

describe('tools', () => {
  it('should support metersToFeet', () => {
    const feet = metersToFeet(10);
    expect(feet).to.be.above(30);
  });
});
