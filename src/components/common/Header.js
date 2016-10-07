import React, {PropTypes} from 'react';
import { Link, IndexLink } from 'react-router';
import './Header.scss';
// import LoadingDots from './LoadingDots';

import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';
import FlatButton from 'material-ui/FlatButton';


const Header = () => {
  return (
    <div>
      <Toolbar>
        <ToolbarGroup firstChild>
          <ToolbarTitle text= 'Portal' className='header-title' />
          <FlatButton label='Home' primary containerElement={<IndexLink to='/' />} />
          <FlatButton label='Products' primary containerElement={<Link to='/products' />} />
          <FlatButton label='Photos' primary containerElement={<Link to='/photos' />} />
          <FlatButton label='Reddit Posts' primary containerElement={<Link to='/reddits' />} />
          <FlatButton label='Courses' primary containerElement={<Link to='/courses' />} />
          <FlatButton label='About' primary containerElement={<Link to='/about' />} />
        </ToolbarGroup>
      </Toolbar>
    </div>
  );
};


Header.propTypes = {
  loading: PropTypes.bool.isRequired
};

export default Header;
