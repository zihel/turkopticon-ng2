//
// Monkey patching Radio buttons until bug fix is merged into angular master
//
// import { NgControl } from '@angular/common';
// import { RadioControlRegistry, RadioControlValueAccessor } from '@angular/common/src/forms/directives/radio_control_value_accessor';
//
// export class RadioControlRegistryFix extends RadioControlRegistry {
//   select(accessor:RadioControlValueAccessor) {
//     (<any>this)._accessors.forEach((c) => {
//       if (this._isSameGroup(c, accessor) && c[1] !== accessor) {
//         c[1].fireUncheck();
//       }
//     });
//   }
//
//   private _isSameGroup(controlPair:[NgControl, RadioControlValueAccessor],
//                        accessor: RadioControlValueAccessor) {
//     return controlPair[0].control.root === accessor._control.control.root &&
//            controlPair[1].name === accessor.name;
//   }
// }
