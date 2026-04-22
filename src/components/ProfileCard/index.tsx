import React from 'react';
import { Card, Typography, Tag } from 'antd';
import { useMediaQuery } from 'react-responsive';
import styles from './index.less';

const { Title, Paragraph } = Typography;

const ProfileCardPage: React.FC = () => {
  const isMobile = useMediaQuery({ maxWidth: 768 });

  const user = {
    name: 'Jack',
    image: 'https://sohanews.sohacdn.com/zoom/640_400/2017/jack01-1509952134031-0-0-1242-2000-crop-1509952138227.jpg',
    description:
      'Jack Ma (Mã Vân) là doanh nhân người Trung Quốc, nhà sáng lập Tập đoàn Alibaba. Ông là một trong những tỷ phú nổi tiếng thế giới, được biết đến với tầm nhìn kinh doanh và hành trình khởi nghiệp đầy cảm hứng.',
  };

  return (
    <div className={styles.pageWrapper}>
      <Card className={styles.cardContainer} bordered={false}>
        <div className={styles.profileCard}>
          <div className={styles.imageSection}>
            <img
              src={user.image}
              alt={user.name}
              className={styles.profileImage}
            />
          </div>

          <div className={styles.infoSection}>
            <Title level={2} className={styles.name}>
              {user.name}
            </Title>

            <Paragraph className={styles.description}>
              {user.description}
            </Paragraph>

            {isMobile ? (
              <div className={styles.mobileContent}>
                <Tag color="orange">Chế độ Mobile</Tag>
                <Paragraph className={styles.deviceText}>
                  Bạn đang xem giao diện mobile. 
                </Paragraph>
              </div>
            ) : (
              <div className={styles.desktopContent}>
                <Tag color="blue">Chế độ Desktop</Tag>
                <Paragraph className={styles.deviceText}>
                  Bạn đang xem giao diện desktop. 
                </Paragraph>
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ProfileCardPage;