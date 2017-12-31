import React from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import { withHandlers } from 'recompose';

import PhotoGallery from './PhotoGallery';

const Item = ({ onOpenPhoto, item }) => {
  return (
    <TouchableWithoutFeedback onPress={onOpenPhoto}>
      <View>
        <PhotoGallery.Photo
          photo={item}
          style={{
            width: item.width,
            height: item.height
          }}
        />
      </View>
    </TouchableWithoutFeedback>
  )
}

export default withHandlers({
  onOpenPhoto: ({ item, onPhotoOpen}) => () => onPhotoOpen(item)
})(Item);

