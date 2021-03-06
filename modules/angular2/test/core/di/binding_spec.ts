import {
  AsyncTestCompleter,
  beforeEach,
  ddescribe,
  describe,
  expect,
  iit,
  inject,
  it,
  xit,
} from 'angular2/test_lib';

import {bind} from 'angular2/core';

export function main() {
  describe('binding', () => {

    describe('type errors', () => {

      it('should throw when trying to create a class binding and not passing a class', () => {
        expect(() => { bind('foo').toClass(<any>0); })
            .toThrowError('Trying to create a class binding but "0" is not a class!');
      });

      it('should throw when trying to create a factory binding and not passing a function', () => {
        expect(() => { bind('foo').toFactory(<any>0); })
            .toThrowError('Trying to create a factory binding but "0" is not a function!');
      });
    });
  });
}
