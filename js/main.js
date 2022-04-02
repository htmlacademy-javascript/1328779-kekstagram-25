import {createPhotos} from './data.js';
import {drawPhotos} from './draw.js';
import {openModal} from './modal.js';


drawPhotos(createPhotos(25), openModal);
