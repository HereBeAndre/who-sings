import { List, Typography } from 'antd';
import { StarFilled } from '@ant-design/icons';

import BaseLayout from 'components/layout/BaseLayout/BaseLayout';
import Page from 'components/layout/Page/Page';
import CustomList from 'components/shared/CustomList/CustomList';

import { getFromStorageAndParse } from 'utils/functions';

import './MyGamesPage.scss';

const { Text } = Typography;

const MyGamesPage: React.FC = (props) => {
  const lastGames: number[] = (
    getFromStorageAndParse('lastGames', 'sessionStorage') || []
  ).reverse();
  const last10Games = lastGames.filter((game: number, index: number) => index < 10);

  return (
    <Page {...props}>
      <BaseLayout>
        <div>
          <CustomList
            //   TODO Make header 'Most recent to oldest', move current title to actual page title - <h2> or smth
            header={<div>Last 10 Games</div>}
            className="last-game-list"
            dataSource={last10Games}
            renderItem={(score: number) => (
              <List.Item>
                <div>
                  <Text>Final Score</Text>
                </div>
                <div>
                  {score === 500 ? (
                    <>
                      <StarFilled /> {score}
                    </>
                  ) : (
                    score
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
