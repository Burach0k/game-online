import { Component } from '../utils/component';

export interface IRegisterComponent {
  registerComponent(component: Component): void;
  unregisterComponent(component: Component): void;
}
