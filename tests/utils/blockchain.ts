// blockchain.ts
// utility class to interact with the blockchain in tests
import {providers} from 'ethers';

export class Blockchain {
  // @ts-ignore
  private _snapshotId: string | number;
  private _provider: providers.JsonRpcProvider;

  constructor(provider: providers.JsonRpcProvider) {
    this._provider = provider;
    // this._snapshotId = '0x1';
  }

  public async saveSnapshotAsync(): Promise<void> {
    const response = await this.sendJSONRpcRequestAsync('evm_snapshot', []);
    this._snapshotId = response;
  }

  public async revertAsync(): Promise<void> {
    if (!this._snapshotId || this._snapshotId === null) {
      // throw new Error('No snapshot to revert to');
      await this.sendJSONRpcRequestAsync('evm_revert', ['0x1']);
    }
    await this.sendJSONRpcRequestAsync('evm_revert', [this._snapshotId]);
  }

  public async resetAsync(): Promise<void> {
    await this.sendJSONRpcRequestAsync('evm_revert', ['0x1']);
  }

  public async anvilResetAsync(): Promise<void> {
    await this.sendJSONRpcRequestAsync('anvil_reset', [{block_number: 1}]);
  }

  public async increaseTimeAsync(duration: any): Promise<any> {
    await this.sendJSONRpcRequestAsync('evm_increaseTime', [duration]);
  }

  public async waitBlocksAsync(count: number) {
    for (let i = 0; i < count; i++) {
      await this.sendJSONRpcRequestAsync('evm_mine', [1]);
    }
  }

  public async waitBlocksAsyncTime(newTimestampInSeconds: any): Promise<any> {
    await this.sendJSONRpcRequestAsync('evm_mine', [newTimestampInSeconds]);
  }

  private async sendJSONRpcRequestAsync(
    method: string,
    params: any[]
  ): Promise<any> {
    return this._provider.send(method, params);
  }
}
