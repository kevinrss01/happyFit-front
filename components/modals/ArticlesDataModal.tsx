/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Button, TextInput, Title } from "@tremor/react";
import toastMessage from "@/utils/toastMessage";

import {
  ModalBodyProps,
  ObjectData,
  ArticlesDataModalProps,
} from "@/types/propsTypes";
import UserAPI from "@/services/API/UserAPI";

const defaultObject: ObjectData = {
  title: "",
  text: "",
  file: "",
  date: new Date().toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }),
  author: "",
  subject: "",
};

const defaultObjectInitializer = () => {
  return { ...defaultObject };
};

const ModalBody: React.FC<ModalBodyProps> = ({
  handleChange,
  handleButtonFileClick,
  handleInputFileChange,
  objectData,
}) => {
  const { title, text, file, author, subject } = objectData;
  return (
    <>
      <label htmlFor="title" className="modal-label w-[80%] flex items-center">
        <TextInput
          className="modal-input w-[100%]"
          value={title}
          onChange={handleChange}
          id="title"
          placeholder="Titre de l'article*"
        />
      </label>
      <label htmlFor="author" className="modal-label w-[80%] flex items-center">
        <TextInput
          className="modal-input w-[100%]"
          value={subject}
          onChange={handleChange}
          id="subject"
          placeholder="Sujet de l'article* (ex: 'Sommeil, nutrition, exercice')"
        />
      </label>
      <label
        htmlFor="text"
        className="modal-label w-[80%] flex items-center justify-center"
      >
        <textarea
          className="modal-text-area w-[100%]"
          value={text}
          onChange={(event) => handleChange(event)}
          id="text"
          placeholder="Corps de l'article* (HTML)"
        />
      </label>
      <label
        htmlFor="subject"
        className="modal-label w-[80%] flex items-center"
      >
        <TextInput
          className="modal-input w-[100%]"
          value={author}
          onChange={handleChange}
          id="author"
          placeholder="Autheur de l'article* (ex: Kevin/Aymen de Happy Fit)"
        />
      </label>
      <label htmlFor="imgSelector" className="modal-label">
        <Button
          className="mb-3 mr-2 w-25 bg-white border-gray-200 text-gray-500 hover:text-white hover:border-gray-300"
          type="button"
          onClick={handleButtonFileClick}
        >
          Sélectionner un fichier
        </Button>
        <input
          className="modal-input"
          onChange={handleInputFileChange}
          accept="image/png, image/jpeg, image/webp"
          id="imgSelector"
          type="file"
        />
        {file && <span>{file.name}</span>}
      </label>
    </>
  );
};

const ArticlesDataModal: React.FC<ArticlesDataModalProps> = ({
  visible,
  showModal,
  closeModal,
}) => {
  const [objectData, setObjectData] = useState(defaultObjectInitializer);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // may be useful for creation of article ?

  useEffect(() => {
    !visible && setObjectData(defaultObject);
  }, [visible]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { id, value } = event.target;
    setObjectData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleInputFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { files } = event.target;
    const file = files.length ? files[0] : undefined;
    setObjectData((prevData) => ({
      ...prevData,
      file: file,
    }));
  };

  const handleButtonFileClick = () => {
    const inputFile = document.getElementById("imgSelector");
    inputFile.click();
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const entries = Object.entries(objectData);
    const allValuesAreValid = entries.every(([key, value]) => value);
    if (allValuesAreValid) {
      setIsLoading(true);
      const formData = new FormData();
      entries.forEach(([key, value]) => {
        formData.append(key, value);
      });

      console.log("formData", formData);

      // UserAPI.createArticleData(formData)
      //   .then(() => {
      //     setObjectData(defaultObject);
      //     toastMessage("Article créé avec succès", "success");
      //   })
      //   .catch(() => {
      //     return toastMessage(
      //       "Une erreur est survenue lors de la création de l'article",
      //       "error",
      //     );
      //   })
      //   .finally(() => {
      //     setIsLoading(false);
      //   });
    } else {
      toastMessage(
        "Veuillez vous concentrer et remplir tous les champs.",
        "error",
      );
    }
  };

  const modalBodyProps = {
    handleChange,
    handleButtonFileClick,
    handleInputFileChange,
    objectData,
  };

  if (!visible) return <button onClick={showModal}>Créer un article</button>;

  return (
    <Transition show={visible} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-900 bg-opacity-25" />
        </Transition.Child>
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                className="w-full max-w-xl transform overflow-hidden ring-tremor bg-white
                            p-6 text-left align-middle shadow-tremor transition-all rounded-xl"
              >
                <Title className="text-center">
                  Ajout de données pour création d'articles
                </Title>
                <form
                  style={{
                    width: "100%",
                    height: "auto",
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                    gap: 15,
                    marginTop: 30,
                  }}
                  onSubmit={handleSubmit}
                >
                  <ModalBody {...modalBodyProps} />
                  <div className="flex gap-2">
                    <Button
                      className="mt-2 w-25 "
                      type="submit"
                      loading={isLoading}
                    >
                      Valider
                    </Button>
                    <Button
                      className="mt-2 w-25"
                      type="button"
                      onClick={closeModal}
                    >
                      Fermer
                    </Button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ArticlesDataModal;
