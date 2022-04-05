import {createPhotos} from './data.js';
import {drawPhotos} from './draw.js';
import {fillPreview} from './preview.js';
import './form.js';


drawPhotos(createPhotos(25), fillPreview);
