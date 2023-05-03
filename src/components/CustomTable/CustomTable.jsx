import React, { useState } from 'react';
import { Table, Button, Modal, Input } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

export const CustomTable = () => {
  const [IsEditing, setIsEditing] = useState(false);
  const [editingNews, setEditingNews] = useState(null);
  const [data, setData] = useState([
    {
      id: 1,
      image: 'image.png',
      newsName: 'Inteligencia artificial',
      description: "La Inteligencia Artificial (IA) es la combinación de algoritmos planteados con el propósito de crear máquinas que presenten las mismas capacidades que el ser humano. Una tecnología que todavía nos resulta lejana y misteriosa, pero que desde hace unos años está presente en nuestro día a día a todas horas.",
      dateNews: '20 abril 2023'
    },
    {
      id: 2,
      image: 'image.png',
      newsName: 'TERN stack',
      description: "In this post, you'll learn about MERN and TERN and why you should migrate from MERN to TERN. We'll cover all the steps involved in migrating a MERN application to TERN (Tigris, Express.js, React, and Node.js). ",
      dateNews: '20 abril 2023'
    },
    {
      id: 3,
      image: 'image.png',
      newsName: 'Generate Figma Designs with AI',
      description: `To use this plugin to generate designs in Figma:
      Add the Builder.io Figma plugin.
      Go to openai.com, add a payment method, and grab your API key.
      Open the Builder.io Figma plugin (use cmd+p or ctrl+p and then type 'Builder.io' and hit enter when our plugin comes up).`,
      dateNews: '20 abril 2023'
    },
  ]);

  const columns = [
    {
      key: 1,
      title: 'ID',
      dataIndex: 'id'
    },{
      key: 2,
      title: 'Imagen',
      dataIndex: 'image'
    },
    {
      key: 3,
      title: 'Nombre Noticia',
      dataIndex: 'newsName'
    },
    {
      key: 4,
      title: 'Descripcion',
      dataIndex: 'description'
    },
    {
      key: 5,
      title: 'Fecha',
      dataIndex: 'dateNews'
    },
    {
      key: 6,
      title: 'Acciones',
      render: (record) => {
        return <>
          <EditOutlined 
            onClick={() => onEditNews(record)}
          />
          <DeleteOutlined 
            style={{ color: 'red', marginLeft: 12 }} 
            onClick={() => onDeleteNews(record)}
          />
        </>   
      }
    }
  ];

  const onAddNews = () => {
    const randomNumber = parseInt(Math.random(1)*31)
    const newNews = {
      id: randomNumber,
      image: 'image'+randomNumber,
      newsName: 'Name News' + randomNumber,
      description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
      dateNews: randomNumber+' abril 2023'
    }
    setData(prevNews => {
      return [...prevNews, newNews]
    });
  }

  const onDeleteNews = (record) => {
    Modal.confirm({
      title: '¿Estás seguro que quieres borrar esta noticia?',
      cancelText: 'Cancelar',
      okText: 'Si',
      okType: 'danger',
      onOk:() => {
        setData((prevNews) => {
          return prevNews.filter((news)=> news.id !== record.id);
        })
      }
    })
  }

  const onEditNews = (record) => {
    setIsEditing(true);
    setEditingNews({...record});
  }

  const resetEditing = () => {
    setIsEditing(false);
    setEditingNews(null);
  };

  return (
    <>
      <Button 
        onClick={onAddNews}
        style={{ marginBottom: 12 }} >Agregar Noticia</Button>
      <Table
        columns={columns}
        dataSource={data}>
      </Table>
      <Modal
        cancelText= 'Cancelar' 
        title='Editar Noticia'
        okText= 'Guardar'
        open={IsEditing} 
        onCancel={() => {
          resetEditing();
        }}
        onOk={() => {
          setData((prevNews) => {
            return prevNews.map((news) => {
              if (news.id === editingNews.id) {
                return editingNews;
              } else {
                return news;
              }
            });
          });
          resetEditing();
        }}>
        <Input 
          value={editingNews?.newsName}
          onChange={(e) => {
            setEditingNews(pre => {
              return {...pre, newsName: e.target.value}
            })
          }} />
      </Modal>
    </>
  )
}
