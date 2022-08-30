import {
  BehaviorSubject,
  concatMap,
  distinctUntilChanged,
  filter,
  from,
  fromEvent,
  Observable,
  of,
  Subject,
  switchMap,
} from 'rxjs';
import { map, debounceTime, tap } from 'rxjs/operators';

const obs = [];
// 1.
// obs[0] =

// 2.
// document.getElementById('input2')
// obs[1] = fromEvent(, 'keyup').pipe();

// 3
const input2Subject = new Subject<number>();
// obs[2] = input2Subject.pipe();

console.log('=========== Result ============');
if (obs.length > 0) {
  const resultObs = obs[obs.length - 1];
  resultObs.subscribe(console.log);
}
