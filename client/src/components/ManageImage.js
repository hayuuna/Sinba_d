import { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../css/manage_image.css';
import Modal from 'react-modal';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUp } from '@fortawesome/free-solid-svg-icons';
import { faCircleDown } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const customModalStyles = {
  overlay: {
    backgroundColor: ' rgba(0, 0, 0, 0.4)',
    width: '100%',
    height: '100vh',
    zIndex: '100',
    position: 'fixed',
    top: '0',
    left: '0',
  },
  content: {
    width: '360px',
    height: '180px',
    zIndex: '150',
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: '10px',
    boxShadow: '2px 2px 2px rgba(0, 0, 0, 0.25)',
    backgroundColor: 'white',
    overflow: 'auto',
  },
};
const ManageImage = ({ handler }) => {
  const { product_id } = useParams();

  const [mainImages, setMainImages] = useState([]);
  const [detailImages, setDetailImages] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalText, setModalText] = useState('');

  useEffect(() => {
    axios({
      method: 'GET',
      url: `/api/products/${product_id}`,
    })
      .then((res) => {
        const iprd = res.data;

        setMainImages(iprd.main_images);
        setDetailImages(iprd.detail_images);
      })
      .finally(() => {
        setModalIsOpen(false);
      });
  }, []);

  const mainInputRef = useRef(null);
  const detailInputRef = useRef(null);

  const handleMove = (target, direction, index) => (e) => {
    e.preventDefault();

    const startIndex = index;
    let endIndex = -1;

    const imageArray = target === 'main' ? mainImages : detailImages;

    if (direction === '+') {
      if (imageArray.length > startIndex + 1) {
        endIndex = startIndex + 1;
      }
    } else {
      if (startIndex - 1 >= 0) {
        endIndex = startIndex - 1;
      }
    }

    if (endIndex !== -1) {
      const startImg = imageArray[startIndex];
      const endImg = imageArray[endIndex];

      const arranged = [...imageArray];
      arranged[endIndex] = startImg;
      arranged[startIndex] = endImg;
      if (target === 'main') {
        setMainImages(arranged);
      } else {
        setDetailImages(arranged);
      }
    }
  };

  const handleDeleteImage = (target, img_id) => (e) => {
    e.preventDefault();
    setModalText(`이미지를 삭제 중입니다...\n${img_id}`);
    setModalIsOpen(true);
    axios({
      method: 'DELETE',
      url: `/api/products/${product_id}/images/${target}`,
      data: JSON.stringify({ images: [img_id] }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        const iprd = res.data;
        setMainImages(iprd.main_images);
        setDetailImages(iprd.detail_images);
      })
      .catch((e) => {})
      .finally(() => {
        setModalIsOpen(false);
      });
  };

  const handleUpdateImages = (e) => {
    e.preventDefault();
    setModalText('이미지를 업로드 중입니다...');
    setModalIsOpen(true);
    axios({
      method: 'PATCH',
      url: `/api/products/${product_id}`,
      data: JSON.stringify({
        main_images: mainImages,
        detail_images: detailImages,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        const iprd = res.data;
        setMainImages(iprd.main_images);
        setDetailImages(iprd.detail_images);
        handler(iprd);
      })
      .catch((e) => {})
      .finally(() => {
        setModalIsOpen(false);
      });
  };

  const handleAddImages = (target) => (e) => {
    e.preventDefault();
    e.persist();
    if (target === 'main') {
      mainInputRef.current.click();
    } else {
      detailInputRef.current.click();
    }
  };

  const handleFilesChange = (target) => (e) => {
    const files = e.target.files;
    if (files.length === 0) {
      return;
    }
    setModalText('이미지를 업로드 중입니다...');
    setModalIsOpen(true);

    const formData = new FormData();
    for (let file of files) {
      formData.append('files', file);
    }
    axios({
      method: 'POST',
      url: `/api/products/${product_id}/images/${target}`,
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((res) => {
        const iprd = res.data;
        setMainImages(iprd.main_images);
        setDetailImages(iprd.detail_images);
      })
      .finally(() => {
        setModalIsOpen(false);
      });
  };

  return (
    <div>
      <Modal isOpen={modalIsOpen} style={customModalStyles} ariaHideApp={true}>
        {modalText}
      </Modal>
      <div className='div__div--file-upload-wrap'>
        <h4 className='div__div--file-upload-title'>이미지 업로드</h4>
        <input
          className='div__input--upload-name'
          placeholder='메인이미지'
          readOnly
        />
        <label
          htmlFor='file'
          onClick={handleAddImages('main')}
          className='div__div--file-search'
        ></label>
        <input
          id='file'
          type='file'
          ref={mainInputRef}
          onChange={handleFilesChange('main')}
          accept='image/jpg,image/png,image/jpeg,image/gif'
          multiple
          className='div__input--file-search'
          hidden
        />
        <button
          onClick={handleAddImages('main')}
          className='div__button---file-add'
        >
          파일추가
        </button>
        <div>
          <div>
            {mainImages?.map((img, index) => {
              return (
                <div>
                  <span className='div__span--uploaded-url'>{img.url}</span>
                  <span>
                    <button
                      className='btn-up'
                      onClick={handleMove('main', '-', index)}
                    >
                      <FontAwesomeIcon
                        icon={faCircleUp}
                        className='div__button--cart-button div__button--cart-button-up'
                      />
                    </button>
                  </span>
                  <span>
                    <button
                      className='btn-down'
                      onClick={handleMove('main', '+', index)}
                    >
                      <FontAwesomeIcon
                        icon={faCircleDown}
                        className='div__button--cart-button div__button--cart-button-down'
                      />
                    </button>
                  </span>
                  <span>
                    <button
                      className='btn-delete'
                      onClick={handleDeleteImage('main', img.image_id)}
                    >
                      <FontAwesomeIcon
                        icon={faTrash}
                        className='div__button--cart-button div__button--cart-button-delete'
                      />
                    </button>
                  </span>
                </div>
              );
            })}
          </div>
          <div className='div__div--img-number'>
            총 {mainImages?.length}개의 메인이미지
          </div>
        </div>
      </div>
      <div className='filebox'>
        <input
          className='upload-name div__input--upload-name'
          placeholder='상세이미지'
          readOnly
        />
        <label htmlFor='file' onClick={handleAddImages('main')}></label>
        <input
          type='file'
          ref={detailInputRef}
          onChange={handleFilesChange('detail')}
          accept='image/jpg,image/png,image/jpeg,image/gif'
          multiple
          hidden
        />
        <button
          onClick={handleAddImages('detail')}
          className='div__button---file-add'
        >
          파일추가
        </button>
        <div>
          <div>
            {detailImages?.map((img, index) => {
              return (
                <div>
                  <span className='div__span--uploaded-url'>{img.url}</span>

                  {/* <img
                    src={img.url}
                    alt=''
                    srcset=''
                    class='image-manager__main_image'
                  /> */}
                  <span>
                    <button
                      className='btn-up'
                      onClick={handleMove('detail', '-', index)}
                    >
                      <FontAwesomeIcon
                        icon={faCircleUp}
                        className='div__button--cart-button div__button--cart-button-up'
                      />
                    </button>
                  </span>
                  <span>
                    <button
                      className='btn-down'
                      onClick={handleMove('detail', '+', index)}
                    >
                      <FontAwesomeIcon
                        icon={faCircleDown}
                        className='div__button--cart-button div__button--cart-button-down'
                      />
                    </button>
                  </span>
                  <span>
                    <button
                      className='btn-delete'
                      onClick={handleDeleteImage('detail', img.image_id)}
                    >
                      <FontAwesomeIcon
                        icon={faTrash}
                        className='div__button--cart-button div__button--cart-button-delete'
                      />
                    </button>
                  </span>
                </div>
              );
            })}
          </div>
        </div>
        <div className='div__div--img-number'>
          총 {detailImages?.length}개의 상세이미지
        </div>
      </div>

      <button onClick={handleUpdateImages} className='div__button--image-save'>
        이미지 저장
      </button>
    </div>
  );
};
export default ManageImage;
