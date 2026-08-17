import type { DetailModalPropsInterface } from './DetailModalPropsInterface.ts';

function DetailModal({ title, onCloseClick, children, subTitle = 'Charlie\'s' }: DetailModalPropsInterface) {
  return (
    <div className="modal d-flex align-items-center justify-content-center vh-100 w-100 test-border-green">
      <div className="book">
        <div className="page page-left text-light test-border-red align-content-between">
          <div className="title with-footer">
            <h2 className="m-0">{ subTitle }</h2>
            <h1 className="m-0">{ title }</h1>
            <h3 className="m-0">A Short Version</h3>
          </div>

          <footer>
            <a href="#" onClick={ onCloseClick } title="GO BACK TO MY LITTLE OFFICE" className="text-light">[close]</a>
          </footer>
        </div>

        <div className="page page-right text-dark test-border-red">
          { children }
        </div>
      </div>
    </div>
  );
}

export default DetailModal;
