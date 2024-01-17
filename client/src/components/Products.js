import { Link } from 'react-router-dom';

const Products = ({
  products,
  loading,
  brands,
  productStyle,
  productStyle2,
}) => {
  if (loading) {
    return <h2>제품을 불러오는 중</h2>;
  }

  const getBrandName = (brandId) => {
    return brands
      .filter((brand) => brand._id === brandId)
      .map((brand) => brand.name);
  };

  return (
    <ul className={`list-group ${productStyle}`}>
      {products.map((product) => (
        <Link to={`/detail/${product._id}`}>
          <li key={product._id} className={`list-group ${productStyle2}`}>
            <img
              src={
                product.main_images[0]?.url ??
                process.env.PUBLIC_URL + `/images/기본제품이미지.jpg`
              }
              className='li__img--product-image'
            />
            <div className='li__img--product-brand'>
              브랜드:{getBrandName(product.brand)}
            </div>
            <div className='li__div--product-title'>
              {product.title} / {product.model_number}
            </div>
            <div className='li__div--product-price'>
              {new Intl.NumberFormat().format(product.price)} 원
            </div>{' '}
          </li>
        </Link>
      ))}
    </ul>
  );
};

export default Products;
