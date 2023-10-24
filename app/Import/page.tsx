'use client'
import { FileInput } from '../components/FileInput'
import PaperButton from '../components/PaperButton';
import { useCallback, useState } from 'react';
import { observer } from 'mobx-react-lite'
import { useRootStore } from '../contexts/RootStoreContext';

// const downloadExcel = (data: unknown) => {
//   const worksheet = XLSX.utils.json_to_sheet(data);
//   const workbook = XLSX.utils.book_new();
//   XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
//   //let buffer = XLSX.write(workbook, { bookType: "xlsx", type: "buffer" });
//   //XLSX.write(workbook, { bookType: "xlsx", type: "binary" });
//   XLSX.writeFile(workbook, "DataSheet.xlsx");
// };


const Import = observer(() => {
  const [isFileDropped, setIsFileDropped] = useState(false)
  const [fileToAdd, setFileToAdd] = useState<Blob>()
  const { cardHolder } = useRootStore()

  const onInputCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsFileDropped(true)
    if (e.target.files) {
      setFileToAdd(e.target.files[0])
    }
  }

  const convertFileToCards = useCallback(() => {
    if (fileToAdd) {
      const fileReader = new FileReader();
      fileReader.readAsText(fileToAdd, "UTF-8");
      fileReader.onload = e => {
        const arrayOfCards = e?.target?.result;
        if (typeof arrayOfCards === 'string') {
          JSON.parse(arrayOfCards).map((card: {
            wordsToRelate: string;
            relationToRelate: string;
          }) => {
            cardHolder.createAndSaveCard(card);
          })
          alert("Cards added successfully!")
        }
      }
    }
  }, [fileToAdd])

  return (
    <div className="flex justify-center flex-col">
      <FileInput accept=".csv,.xlsx,.json" onInputCapture={onInputCapture} />
      <PaperButton disabled={!isFileDropped} onClick={convertFileToCards} className="mt-10">Convert</PaperButton>
    </div>
  )
})

export default Import;
