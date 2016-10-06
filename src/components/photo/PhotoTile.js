import React, {PropTypes} from 'react';

import {GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';

const PhotoTile = ({photo}) => {
  return (
     <GridTile
          key={photo.uid}
          title={photo.type}
          subtitle={<span>by <b>{photo.name}</b></span>}
          actionIcon={<IconButton><StarBorder color="white" /></IconButton>}
        >
          <img src={photo.image_large} />
        </GridTile>
  );
};

PhotoTile.propTypes = {
  photo: PropTypes.object.isRequired
};

export default PhotoTile;
