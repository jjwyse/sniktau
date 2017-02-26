import {filter} from 'util/tools';
import {expect} from 'chai';

describe('tools', () => {
  it('should support filter', () => {
    const items = ['foo', 'bar'];
    const filtered = items.filter(filter);
    expect(filtered).to.have.length(1);
    expect(filtered[0]).to.equal('foo');
  });
});
