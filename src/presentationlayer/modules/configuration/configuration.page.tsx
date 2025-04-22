import { useState } from 'react';
import ServerStats from './tabs/server-stats';
import './configuration.scss';

enum ConfigurationTabsEnum {
  SERVER_STATS,
}

export default function ConfigurationPage() {
  const [activeConfigurationTab, setActiveConfigurationTab] = useState<ConfigurationTabsEnum>(ConfigurationTabsEnum.SERVER_STATS);

  return <div className='configuration'>{activeConfigurationTab === ConfigurationTabsEnum.SERVER_STATS && <ServerStats />}</div>;
}
