export enum FILTERS {
  "ALL" = "ALL",
  "DECLARE" = "DECLARE",
  "DEPLOY" = "DEPLOY",
  "DEPLOY_ACCOUNT" = "DEPLOY_ACCOUNT",
  "INVOKE" = "INVOKE",
  "L1_HANDLER" = "L1_HANDLER",
}
const FilterGroup = ({ children }: { children: React.ReactNode }) => {
  return (
    <ul className="flex w-fit rounded text-base border border-neutral-600 divide-x divide-neutral-600 lowercase">
      {children}
    </ul>
  );
};

FilterGroup.Item = ({
  active = false,
  value,
  setValue,
}: {
  active?: boolean;
  value: FILTERS;
  setValue: React.Dispatch<React.SetStateAction<FILTERS>>;
}) => {
  const activeClass = " bg-neutral-600 text-white ";
  const inactiveClass = " hover:bg-neutral-800 ";
  return (
    <li
      onClick={() => setValue(value)}
      className={`px-4 py-1 cursor-pointer select-none ${
        active ? activeClass : inactiveClass
      }`}
    >
      {value}
    </li>
  );
};

export default FilterGroup;
