import { Singleton } from '@common/function/singletonDecorator'
import { $ } from '@main/utils/shell'
import type { Device, Emulator, EmulatorAdapter } from '@type/device'

// import psList from 'ps-list'
import { defaultAdbPath, getDeviceUuid, parseAdbDevice } from '../utils'

@Singleton
class MacEmulator implements EmulatorAdapter {
  protected async getBluestack(): Promise<void> {}

  protected async getNox(): Promise<void> {}

  protected async getMumu(): Promise<void> {}

  protected async getLd(): Promise<void> {}

  protected async getPlayCover(): Promise<void> {
    console.log('playCover', this)
  }

  async getAdbDevices(): Promise<Device[]> {
    const { stdout } = await $`${defaultAdbPath} devices`
    const devices = parseAdbDevice(stdout)
    return Promise.all(
      devices.map(async d => {
        const uuid = await getDeviceUuid(d.address, defaultAdbPath)
        return { ...d, uuid: uuid || '' }
      })
    )
  }

  async getEmulators(): Promise<Emulator[]> {
    const emulator: Emulator[] = []
    const psList = await import('ps-list')
    const processes = await psList.default()
    processes.forEach(process => console.log(process))
    const possiblePs = processes.filter(i => (i.cpu || 0) > 1)
    console.log('possiblePs', possiblePs.length)
    const filtered = possiblePs.filter(i => {
      const cmd = i.cmd?.toLocaleLowerCase() || ''
      console.log('cmd', cmd)
      return cmd.includes('playcover') || cmd.includes('arknight')
    })
    for (const p of filtered) {
      if (p.cmd?.toLocaleLowerCase().includes('playcover')) {
        emulator.push({
          pname: 'PlayCover',
          pid: p.pid,
        })
      }
      if (p.cmd?.toLocaleLowerCase().includes('arknight')) {
        emulator.push({
          pname: 'Arknight',
          pid: p.pid,
        })
      }
    }
    console.log('getMacEmulators', emulator)
    return emulator
  }
}

export default new MacEmulator()
