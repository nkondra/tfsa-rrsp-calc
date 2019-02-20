import React from 'react';
import { Header, Icon } from 'semantic-ui-react';

const HeaderBar = () => (
  <Header as="h2">
    <Icon name="calculator" />
    <Header.Content>
      RRSP vs TFSA Calculator
      <Header.Subheader>What saving strategy is best for you</Header.Subheader>
    </Header.Content>
  </Header>
);

export default HeaderBar;
