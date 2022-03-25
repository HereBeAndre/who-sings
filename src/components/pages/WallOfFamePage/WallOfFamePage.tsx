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
    const usersSessionStorageData = Object.entries(localStorage);
    const manipulatedUsersSessionStorageData = manipulateUserData(usersSessionStorageData);
    const sortedUserData = manipulatedUsersSessionStorageData.sort((a, b) => b.score - a.score);
    const bestTenUsers = sortedUserData.slice(0, WOF_CUT_OFF);
    setUsersData(bestTenUsers);
  }, []);

  return (
    <Page {...props}>
      <BaseLayout>
        <CustomList
          //   TODO Make header 'Most recent to oldest', move current title to actual page title - <h2> or smth
          header={<div>Wall of Fame</div>}
          className="wof-list"
          dataSource={usersData}
          renderItem={(user: TWallOfFameUserData, index: number) => (
            <List.Item>
              <div>
                <Text>
                  {index + 1}. {user.username}
                </Text>
              </div>
              <div>
                <Text>{user.score}</Text>
              </div>
            </List.Item>
          )}
        />
      </BaseLayout>
    </Page>
  );
};

export const MemoizedWOFPage = memo(WallOfFamePage);
