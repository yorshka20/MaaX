declare namespace Api.Maa {
  type Platform = "windows" | "macos" | "linux" | "NoPlatform";
  type Arch = "x64" | "arm64" | "NoArch";
  type Component = "MaaCore"; // TODO: MaaDS Component

  interface Resource {
    file_name: string;
    path: string;
    hash: string;
  }

  interface DownloadUrl {
    version: string;
    platform: string;
    arch: string;
    url: string;
    hash: string;
  }

  interface VersionMetadata {
    publish_time: string;
    version: string;
  }

  interface VersionDetail {
    publish_time: string;
    version: string;
    update_log: string;
    resources: Array<Resource>;
  }

  type GameServers = "cn" | "us" | "jp" | "kr";
  type GameLocales = "zh" | "en" | "ja" | "ko";
  type StageType = "MAIN" | "SUB" | "ACTIVITY" | "DAILY";
  type ZoneType = "MAINLINE";

  type StageMetadata = {
    stage_id: string;
    stage_type: StageType;
    stage_code: string;
    stage_ap_cost: number;
  };

  type Zone = {
    zoneID: string;
    zoneIndex: number;
    type: ZoneType;
    zoneNameFirst: string;
    zoneNameSecond: string;
    zoneNameTitleCurrent: string;
    zoneNameTitleUnCurrent: string;
    zoneNameTitleEx: string;
    zoneNameThird: string;
    lockedText: string;
    canPreview: boolean;
  };

  type Stage = {
    stageType: StageType;
    difficulty: string;
    performanceStageFlag: string;
    stageId: string;
    levelId: string;
    zoneId: string;
    code: string;
    name: string;
    description: string;
    hardStagedId: string;
    dangerLevel: string;
    dangerPoint: number;
    loadingPicId: string;
    canPractice: string;
    canBattleReplay: string;
    apCost: number;
    apFailReturn: number;
    etItemId: string | null;
    etCost: number;
    etFailReturn: number;
    apProtectTimes: number;
    diamondOnceDrop: number;
    practiceTicketCost: number;
    dailyStageDifficulty: number;
    expGain: number;
    goldGain: number;
    loseExpGain: number;
  };

  type Item = {
    category: Array<string>;
    description: string;
    id: string;
    image: string;
    name: string;
    obtain: string;
    rarity: number;
    usage: string;
  };
}
