import {Injectable, NgZone} from '@angular/core';
import {RemoteConfig, fetchAndActivate, getBoolean, getValue} from '@angular/fire/remote-config';

@Injectable({ providedIn: 'root' })
export class RemoteConfigService {
  constructor(
    private remoteConfig: RemoteConfig,
    private ngZone: NgZone
  ) {}

  async getFlag(flagName: string): Promise<boolean> {
    try {
      return await this.ngZone.run(async () => {
        await fetchAndActivate(this.remoteConfig);
        const value = getValue(this.remoteConfig, flagName).asBoolean();
        console.log(`[FeatureFlag] ${flagName} =`, value);
        return value;
      });
    } catch (error) {
      console.error('[FeatureFlag] Error:', error);
      return false;
    }
  }
}
