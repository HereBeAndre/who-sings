import { List, Typography } from 'antd';
import { StarFilled } from '@ant-design/icons';

import BaseLayout from 'components/layout/BaseLayout/BaseLayout';
import Page from 'components/layout/Page/Page';
import CustomList from 'components/shared/CustomList/CustomList';

import { getFromStorageAndParse } from 'utils/functions';

const { Text } = Typography;

const MyGamesPage: React.FC = (props) => {
  const lastGames: number[] = (
    getFromStorageAndParse('lastGames', 'sessionStorage') || []
  ).reverse();
  const last10Games = lastGames.filter((game: number, index: number) => index < 10);

  return (
    <Page {...props}>
      <BaseLayout>
        <CustomList
          header={<div>My Last 10 Games</div>}
          className="last-game-list"
          dataSource={last10Games}
          renderItem={(score: number) => (
            <List.Item>
              <div>
                <Text>Game Score</Text>
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
      </BaseLayout>
    </Page>
  );
};

export default MyGamesPage;
