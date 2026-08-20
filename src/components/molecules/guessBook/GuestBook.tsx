import { type ChangeEvent, MouseEvent, useState } from 'react';
import FApp from '../../../app';
import type { UiStateInterface } from '../../../app/interfaces/UiStateInterface.ts';

function GuestBook() {
  const [guestName, setGuestName] = useState<string>('');
  const [guestMessage, setGuestMessage] = useState<string>('');
  const [guestCountry, setGuestCountry] = useState<string>('');
  const now = new Date();

  const onNameChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setGuestName(e.target.value);
  };

  const onMessageChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    setGuestName(e.target.value);
  };

  const onCountryChange = (e: ChangeEvent<HTMLSelectElement>): void => {
    console.log(e.target.value);
  };

  const onSubmitClick = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    console.log('N', guestName);
    console.log('c', guestCountry);

    if (guestName.length && guestCountry.length) {
      console.warn('GO!');
      await FApp.api.postGuestEntry({
        id: -2,
        name: guestName,
        timestamp: (new Date()).getTime(),
        country: guestCountry,
        role: 'TBD...',
        message: guestMessage.length ? guestMessage : null
      });

      FApp.store.ui.setProperty<boolean>('guestBookSigned', true);
    } else {
      console.warn('NO!');
    }
  };

  return (
    <div className="content w-100">
      <header>
        <h2 className="m-0">{ now.toLocaleString() }</h2>
      </header>

      <form className="fs-12">
        <div className="input-group my-1 text-dark">
          <input type="text" id="name" onChange={ onNameChange } value={ guestName }/>
        </div>

        <div className="input-group my-1 text-dark">
          <label htmlFor="country">You are from</label>
          <select id="country" onSelect={ onCountryChange }>
            <option></option>
            <option value={ 1 }>Ecuador (ECU)</option>
          </select>
        </div>

        <div className="input-group my-1 text-dark">
          <textarea id="message" onChange={ onMessageChange } placeholder="Your message" rows={ 3 }></textarea>
        </div>

        <div className="input-group my-1">
          <button type="button" onClick={ onSubmitClick } className="text-light">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default GuestBook;
