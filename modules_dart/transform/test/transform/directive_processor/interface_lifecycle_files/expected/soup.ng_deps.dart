library dinner.soup.ng_deps.dart;

import 'soup.dart';
export 'soup.dart';
import 'package:angular2/src/core/reflection/reflection.dart' as _ngRef;
import 'package:angular2/metadata.dart';

var _visited = false;
void initReflector() {
  if (_visited) return;
  _visited = true;
  _ngRef.reflector
    ..registerType(
        OnChangeSoupComponent,
        new _ngRef.ReflectionInfo(
            const [
              const Component(
                  selector: '[soup]',
                  lifecycle: const [LifecycleEvent.onChange])
            ],
            const [],
            () => new OnChangeSoupComponent(),
            const [OnChange]))
    ..registerType(
        OnDestroySoupComponent,
        new _ngRef.ReflectionInfo(
            const [
              const Component(
                  selector: '[soup]',
                  lifecycle: const [LifecycleEvent.onDestroy])
            ],
            const [],
            () => new OnDestroySoupComponent(),
            const [OnDestroy]))
    ..registerType(
        OnCheckSoupComponent,
        new _ngRef.ReflectionInfo(
            const [
              const Component(
                  selector: '[soup]', lifecycle: const [LifecycleEvent.onCheck])
            ],
            const [],
            () => new OnCheckSoupComponent(),
            const [OnCheck]))
    ..registerType(
        OnInitSoupComponent,
        new _ngRef.ReflectionInfo(
            const [
              const Component(
                  selector: '[soup]', lifecycle: const [LifecycleEvent.onInit])
            ],
            const [],
            () => new OnInitSoupComponent(),
            const [OnInit]))
    ..registerType(
        OnAllChangesDoneSoupComponent,
        new _ngRef.ReflectionInfo(
            const [
              const Component(
                  selector: '[soup]',
                  lifecycle: const [LifecycleEvent.onAllChangesDone])
            ],
            const [],
            () => new OnAllChangesDoneSoupComponent(),
            const [OnAllChangesDone]));
}