function Pages({ classNameFile, classNameFolder, urlFile, urlFolder }) {
  return (
    <>
      <section className="center pages">
        <a className={classNameFile} href={urlFile}>
          File 📄
        </a>
        <a className={classNameFolder} href={urlFolder}>
          Folder 📁
        </a>
      </section>
      <hr />
    </>
  );
}

export default Pages;
