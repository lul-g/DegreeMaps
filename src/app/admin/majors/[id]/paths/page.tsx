import React from 'react';

function page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  console.log(searchParams);
  return <div>{searchParams.path}</div>;
}

export default page;
