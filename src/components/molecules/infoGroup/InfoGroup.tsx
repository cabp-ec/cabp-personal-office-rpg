import type { InfoGroupPropsInterface } from './InfoGroupPropsInterface.ts';

export function InfoGroup({ title, group, subTitleKey }: InfoGroupPropsInterface) {
  return (
    <div className="info-group">
      <h2>{ title }</h2>

      <div className="entry-list">
        {
          group.map((entry, i) => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            const subTitle = subTitleKey ? entry[subTitleKey] ?? null : null;

            return (
              <div key={ `key_if_${ i }` } className="mb-2">
                <h3 className="m-0">{ entry.name }, { entry.endDate!.year }</h3>
                { subTitle && <h5 className="text-italic text-capitalize">{ subTitle }</h5> }
                <p>{ entry.organization }, { entry.country.name }</p>
              </div>
            );
          })
        }
      </div>
    </div>
  );
}
