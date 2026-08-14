import type { DetailModalPropsInterface } from './DetailModalPropsInterface.ts';

export function DetailModal({ dialogueKey, title, curriculum }: DetailModalPropsInterface) {
  return (
    <div className="modal d-flex align-items-center justify-content-center vh-100 w-100 test-border-green">
      <div className="book">
        <div className="page page-left text-light test-border-red align-content-between">
          <div className="title">
            <h2 className="m-0">Introduction To</h2>
            <h1 className="m-0">{ title }</h1>
            <h3 className="m-0">An In-Depth Analysis</h3>
          </div>

          <div className="index">
            <ul>
              <li>a</li>
            </ul>
          </div>
        </div>

        <div className="page page-right text-dark test-border-red">
          Right page
        </div>
      </div>

      {/*<div className="content bg bg-book d-flex">
        <div className="page page-title text-light text-center test-border-green">

        </div>

        <div className="page text-dark w-50 test-border-green">
          right
        </div>
      </div>*/ }
    </div>
  );
}
