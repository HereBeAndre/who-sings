import { useState, useEffect, memo } from 'react';
import { List, Typography } from 'antd';

import BaseLayout from 'components/layout/BaseLayout/BaseLayout';
import Page from 'components/layout/Page/Page';
import CustomList from 'components/shared/CustomList/CustomList';

import { TWallOfFameUserData } from 'schemas/userData_d';

import { manipulateUserData } from 'utils/functions';
import { WOF_CUT_OFF } from 'utils/constants';

import './WallOfFamePage.scss';

const { Text } = Typography;

const WallOfFamePage: React.FC = (props) => {
  const [usersData, setUsersData] = useState<TWallOfFameUserData[]>([]);

  useEffect(() => {
    // TODO Implement new high score ranking logic - see notes
    const usersSessionStorageData = Object.entries(sessionStorage);
    const manipulatedUsersSessionStorageData = manipulateUserData(usersSessionStorageData);
    const bestTenUsers = manipulatedUsersSessionStorageData.slice(0, WOF_CUT_OFF);
    const sortedUserData = bestTenUsers.sort((a, b) => b.highscore - a.highscore);
    setUsersData(sortedUserData);
  }, []);

  return (
    <Page {...props}>
      <BaseLayout>
        <div className="quiz-page-container">
          <CustomList
            //   TODO Make header 'Most recent to oldest', move current title to actual page title - <h2> or smth
            header={<div>Wall of Fame</div>}
            className="wof-list"
            dataSource={usersData}
            renderItem={(user: TWallOfFameUserData) => (
              <List.Item>
                <div>
                  <Text>{user.username}</Text>
                </div>
                <div>
                  <Text>{user.highscore}</Text>
                </div>
              </List.Item>
            )}
          />
        </div>
      </BaseLayout>
    </Page>
  );
};

export const MemoizedWOFPage = memo(WallOfFamePage);
