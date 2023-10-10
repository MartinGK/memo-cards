export function FileInput() {
  return (
    <>
      <label htmlFor="images" className="drop-container">
        <span className="drop-title">Drop files here</span>
        or
        <input type="file" id="images" accept="image/*" required />
      </label>
      <style>
        {`
          input[type=file] {
                width: 350px;
                max-width: 100%;
                color: #444;
                padding: 5px;
                background: #fff;
                border-radius: 10px;
                border: 1px solid #555;
            }
            
            input[type=file]::file-selector-button {
                margin-right: 20px;
                border: none;
                background: #084cdf;
                padding: 10px 20px;
                border-radius: 10px;
                color: #fff;
                cursor: pointer;
                transition: background .2s ease-in-out;
            }
            
            input[type=file]::file-selector-button:hover {
                background: #0d45a5;
            }
            
            .drop-container {
                position: relative;
                display: flex;
                gap: 10px;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                height: 200px;
                padding: 20px;
                border-radius: 10px;
                border: 2px dashed #555;
                color: #444;
                cursor: pointer;
                transition: background .2s ease-in-out, border .2s ease-in-out;
            }
            
            .drop-container:hover {
                background: #eee;
                border-color: #111;
            }
            
            .drop-container:hover .drop-title {
                color: #222;
            }
            
            .drop-title {
                color: #444;
                font-size: 20px;
                font-weight: bold;
                text-align: center;
                transition: color .2s ease-in-out;
            }
            
            .drop-container.drag-active {
            background: #eee;
            border-color: #111;
            }
            
            .drop-container.drag-active .drop-title {
            color: #222;
            }
          `}
      </style>
    </>
  );
}
