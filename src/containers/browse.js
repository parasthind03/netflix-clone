/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useState, useEffect } from 'react';
import Fuse from 'fuse.js';
import SelectProfileContainer from './profiles';
import { FirebaseContext } from '../context/firebase';
import { Loading, Header, Card, Player } from '../components';
import {FooterContainer} from './footer'
import * as ROUTES from '../constants/routes';
import logo from '../logo.svg';

export default function BrowseContainer({ slides }) {
  const [category, setCategory] = useState('series');
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [slideRows, setSlideRows] = useState([]);

  const { firebase } = useContext(FirebaseContext);
  const user = firebase.auth().currentUser || {};

  useEffect(() => {
    // console.log(profile);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile.displayName]);

  useEffect(() => {
    setSlideRows(slides[category]);
  }, [slides, category]);

  useEffect(() => {
    const fuse = new Fuse(slideRows, {keys: ['data.description', 'data.title', 'data.genre']})
    const result = fuse.search(searchTerm).map(({item}) => item)
    if(slideRows.length > 0 && searchTerm.length > 3 && result.length > 0){
      setSlideRows(result)
    } else{
      setSlideRows(slides[category])
    }
  }, [searchTerm])

  return profile.displayName ? (
    <>
      {loading ? <Loading src={profile.photoURL} /> : <Loading.ReleaseBody />}

      <Header src="stranger" dontShowOnSmallViewPort>
        <Header.Frame>
          <Header.Group>
            <Header.Logo to={ROUTES.HOME} src={logo} alt="Netflix" />
            <Header.TextLink
              active={category === 'series' ? 'true' : 'false'}
              onClick={() => setCategory('series')}
            >
              Series
            </Header.TextLink>
            <Header.TextLink
              active={category === 'films' ? 'true' : 'false'}
              onClick={() => setCategory('films')}
            >
              Films
            </Header.TextLink>
          </Header.Group>
          <Header.Group>
            <Header.Search
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
            />
            <Header.Profile>
              <Header.Picture src={user.photoURL} />
              <Header.Dropdown>
                <Header.Group>
                  <Header.Picture src={user.photoURL} />
                  <Header.TextLink>{user.displayName}</Header.TextLink>
                </Header.Group>
                <Header.Group>
                  <Header.TextLink onClick={() => firebase.auth().signOut()}>
                    Sign Out
                  </Header.TextLink>
                </Header.Group>
              </Header.Dropdown>
            </Header.Profile>
          </Header.Group>
        </Header.Frame>
        <Header.Feature>
          <Header.FeatureCallOut>Stranger Things</Header.FeatureCallOut>
          <Header.Text>
            When a young boy vanishes, a small town uncovers a mystery involving
            secret experiments, terrifying supernatural forces and one strange
            little girl.
          </Header.Text>
          <Header.PlayButton>Play</Header.PlayButton>
        </Header.Feature>
      </Header>

      <Card.Group>
        {slideRows.map(item => (
          <Card key={`${category}-${item.title.toLowerCase()}`}>
            <Card.Title>{item.title}</Card.Title>
            <Card.Entities>
              {item.data.map((cardItem) => (
                <Card.Item key={cardItem.docId} item={cardItem}>
                  <Card.Image src={`/images/${category}/${cardItem.genre}/${cardItem.slug}/small.jpg`} />
                  <Card.Meta>
                    <Card.SubTitle>{cardItem.title}</Card.SubTitle>
                    <Card.Text>{cardItem.description}</Card.Text>
                  </Card.Meta>
                </Card.Item>
              ))}
            </Card.Entities>
            <Card.Feature category={category}>
              <Player>
                <Player.Button />
                <Player.Video src="/videos/bunny.mp4" />
              </Player>
            </Card.Feature>
          </Card>
        ))}
      </Card.Group>
      <FooterContainer />
    </>
  ) : (
    <SelectProfileContainer user={user} setProfile={setProfile} />
  );
}
