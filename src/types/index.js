import * as api from "../api";
import PhotoComponent, {
  Thumbnail as PhotoThumbnail,
} from "../components/Media/Photo";
import VideoComponent, {
  Thumbnail as VideoThumbnail,
} from "../components/Media/Video";

export function Gallery(entry) {
  this._sys = entry.sys;
  this._fields = entry.fields;
  this.id = this._sys.id;

  this.name = this._fields.title;
  this.slug = this._fields.slug;
  this.items = null;
}

Gallery.prototype.forEachItem = function (cb) {
  this.items.forEach(function (galleryItem, index, map) {
    cb(galleryItem.item, index, map);
  });
};

Gallery.prototype.fetchItems = async function () {
  if (!this.items) {
    const entry = await api.getEntryById(this.id);
    let prev;
    this.items = entry.fields.images.reduce(function (items, item, index) {
      const galleryItem = new types[item.sys.contentType.sys.id](item);
      const nextEntry = entry.fields.images[index + 1];
      items.set(galleryItem.id, {
        item: galleryItem,
        prev: prev ? prev.id : prev,
        next: nextEntry ? nextEntry.sys.id : nextEntry,
      });
      prev = galleryItem;
      return items;
    }, new Map());
  }

  return this.items;
};

Gallery.prototype.item = function (id) {
  const item = this.items.get(id);
  return item ? item.item : item;
};

export function Image(entry) {
  this._sys = entry.sys;
  this._fields = entry.fields;

  this.imageOptimization = "?";
  this.id = this._sys.id;
  this.title = this._fields.title || "Untitled";
  this.caption = this._fields.imageCaption;
  try {
    this.thumb =
      this._fields.photo.fields.file.url +
      `?${Image.optimization}&${Image.thumbCrop}`;
    this.url = this._fields.photo.fields.file.url + `?${Image.optimization}`;
    this.height = this._fields.photo.fields.file.details.image.height;
    this.width = this._fields.photo.fields.file.details.image.width;
  } catch (e) {
    console.error(e);
    this.thumb = "/images/missing-file.png";
    this.url = "/images/missing-file.png";
    this.height = "200";
    this.width = "200";
  }
}

Image.thumbCrop = "w=400";
Image.optimization = "fm=jpg&fl=progressive";

Image.prototype.Component = PhotoComponent;
Image.prototype.Thumbnail = PhotoThumbnail;

export function MenuBar(entry) {
  this._sys = entry.sys;
  this._fields = entry.fields;

  this.location = this._fields.location;

  this.items = this._fields.gallery.map((g) => new Gallery(g));
}

MenuBar.prototype.findGallery = function (id) {
  return this.items.find(function (gallery) {
    return gallery.slug === id;
  });
};

export function Video(entry) {
  this._sys = entry.sys;
  this._fields = entry.fields;

  this.id = this._sys.id;
  this.title = this._fields.title;
  this.url = this._fields.videoUrl;
  this.videoServiceColor = "0eaae0";
  this.description = this._fields.description;

  // eslint-disable-next-line
  switch (this.url.match(/^https?:\/\/(?:www\.)?([^/]+)/)[1]) {
    case "vimeo.com": {
      const videoId = this.url.match(/^https?:\/\/vimeo.com\/(\d+)/)[1];
      this.iframeHtml = `<style>.embed-container { position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; } .embed-container iframe, .embed-container object, .embed-container embed { position: absolute; top: 0; left: 0; width: 100%; height: 100%; }</style><div class='embed-container'><iframe src='https://player.vimeo.com/video/${videoId}?color=${this.videoServiceColor}' frameborder='0' webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe></div>`;
      break;
    }
    case "youtu.be": {
      const videoId = this.url.match(/youtu.be\/([\w-]+)$/)[1];
      // ?rel=0 means don't show related videos at the end
      this.iframeHtml = `<style>.embed-container { position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; } .embed-container iframe, .embed-container object, .embed-container embed { position: absolute; top: 0; left: 0; width: 100%; height: 100%; }</style><div class='embed-container'><iframe src='https://www.youtube.com/embed/${videoId}?rel=0' frameborder='0' allowfullscreen></iframe></div>`;
      break;
    }
    case "youtube.com": {
      const videoId = this.url.match(/\?v=([\w-]+)/)[1];
      // ?rel=0 means don't show related videos at the end
      this.iframeHtml = `<style>.embed-container { position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; } .embed-container iframe, .embed-container object, .embed-container embed { position: absolute; top: 0; left: 0; width: 100%; height: 100%; }</style><div class='embed-container'><iframe src='https://www.youtube.com/embed/${videoId}?rel=0' frameborder='0' allowfullscreen></iframe></div>`;
      break;
    }
  }

  console.log(this);
}

Video.prototype.Component = VideoComponent;
Video.prototype.Thumbnail = VideoThumbnail;

const types = {
  "7leLzv8hW06amGmke86y8G": Gallery,
  "1xYw5JsIecuGE68mmGMg20": Image,
  menuBar: MenuBar,
  video: Video,
};
