import React, { useState } from 'react'
import { Select, Typography, Row, Col, Avatar, Card } from 'antd';
import moment from 'moment';

import { useGetCryptoNewsQuery } from '../apis/cryptoNewsApi';
import { useGetCryptosQuery } from '../apis/cryptoApi';
import Loader from './Loader';

const { Text, Title } = Typography;
const { Option } = Select;

const demoImage = 'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News';

const News = ({simplified}) => {
  const [token, setToken] = useState('BTC');
  const batchSize = simplified ? Number(6) : Number(12);
  const { data } = useGetCryptosQuery(50);
  const {data: cryptoNews} = useGetCryptoNewsQuery({token,batchSize});
  // console.log(cryptoNews);

  if(!cryptoNews?.news) return <Loader />;

  return (
    <>
      <Row gutter={[24, 24]}>
      {!simplified && (
        <Col span={24}>
          <Select
            showSearch
            className="select-news"
            placeholder="Select a Crypto"
            optionFilterProp="children"
            onChange={(value) => setToken(value)}
            filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          >
            {data?.data?.coins?.map((coin) => <Option value={coin.symbol}>{coin.symbol}</Option>)}
          </Select>
        </Col>
      )}

        {cryptoNews?.news.map((news,index)=>(
          <Col xs={24} sm={12} lg={8} key={index}>
            <Card hoverable className="news-card">
              <a href={news?.Url} target="_blank" rel="noreferrer">
                <div className="news-image-container">
                  <Title className="news-title" level={4}>{news?.Title}</Title>
                  <img className='img' src={news?.Image || demoImage} alt="" />
                </div>
                <p>{news?.Description.length > 100 ? `${news?.Description.substring(0, 100)}...` : news?.Description}</p>
                <div className="provider-container">
                  <div>
                    {/* <Avatar src={news?.Image || demoImage} alt="" /> */}
                    <Text className="provider-name">{news?.Source}</Text>
                  </div>
                  <Text>{moment(news?.PublishedOn).startOf('ss').fromNow()}</Text>
                </div>
              </a>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  )
}

export default News