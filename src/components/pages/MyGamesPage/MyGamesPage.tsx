import { PushpinOutlined, StarOutlined } from '@ant-design/icons';
import { List, Typography } from 'antd';

import BaseLayout from 'components/layout/BaseLayout/BaseLayout';
import Page from 'components/layout/Page/Page';
import CustomList from 'components/shared/CustomList/CustomList';

import { getFromStorageAndParse } from 'utils/functions';

import './MyGamesPage.scss';

const { Text } = Typography;

const MyGamesPage: React.FC = (props) => {
  const lastGames = (getFromStorageAndParse('lastGames') || []).reverse();
  const last10Games = lastGames.filter((game: any, index: number) => index < 10);

  return (
    <Page {...props}>
      <BaseLayout>
        <div className="login-page-container">
          <CustomList
            //   TODO Make header 'Most recent to oldest', move current title to actual page title - <h2> or smth
            header={<div>Last 10 Games</div>}
            className="last-game-list"
            dataSource={last10Games}
            renderItem={(game: any) => (
              <List.Item>
                <div>
                  <Text>
                    <PushpinOutlined /> Game Score
                  </Text>
                </div>
                <div>
                  {game.score === 500 ? (
                    <>
                      <StarOutlined /> {game.score}
                    </>
                  ) : (
                    game.score
                  )}
                </div>
              </List.Item>
            )}
          />
        </div>
      </BaseLayout>
    </Page>
  );
};

export default MyGamesPage;
