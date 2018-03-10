
import { CartSortPipe } from './cart-sort.pipe';

const items = [
  {
    property: {
      nestedProperty: {
        name: 'c',
      },
      price: 222
    }
  },
  {
    property: {
      nestedProperty: {
        name: 'b'
      },
      price: 111
    }
  },
  {
    property: {
      nestedProperty: {
        name: 'a'
      },
      price: 333
    }
  }
];

const expectedItemsByName = [
  {
    property: {
      nestedProperty: {
        name: 'a'
      },
      price: 333
    }
  },
  {
    property: {
      nestedProperty: {
        name: 'b'
      },
      price: 111
    }
  },
  {
    property: {
      nestedProperty: {
        name: 'c'
      },
      price: 222
    }
  }
];

const expectedItemsByPriceDesc = [
  {
    property: {
      nestedProperty: {
        name: 'a'
      },
      price: 333
    }
  },
  {
    property: {
      nestedProperty: {
        name: 'c'
      },
      price: 222
    }
  },
  {
    property: {
      nestedProperty: {
        name: 'b'
      },
      price: 111
    }
  }
];


describe('CartSortPipe', () => {

  const pipe = new CartSortPipe();

  it('should sort cart items by product name ascending', () => {
    expect(pipe.transform(items, 'property.nestedProperty.name', false)).toEqual(expectedItemsByName);
  });

  it('should sort cart items by product name ascending', () => {
    expect(pipe.transform(items, 'property.price', true)).toEqual(expectedItemsByPriceDesc);
  });
});
