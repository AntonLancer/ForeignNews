import React from 'react';
import { Item, Label, Modal, Button} from "semantic-ui-react";

const setText = (s) => s.length >= 300 ? s.substr(0, 300) + ' ...' : s;

const Post = ({title, title_orig, text, text_orig, image, name, url}) => {
    return (
    <Item>
      <Item.Image src={image} />
      <Item.Content>
        <Item.Header as='a'>{title}</Item.Header>
        <Item.Meta>
          <span className='cinema'>{url}</span>
        </Item.Meta>
        <Item.Description>{setText(text)}</Item.Description>
        <Item.Extra>
          <Modal
          trigger={<Button  primary floated='right'>Перевод</Button>}
          header= {title}
          content= {text}
          actions={['Закрыть']}
          />
          <Modal
          trigger={<Button  primary floated='right'>Оригинал</Button>}
          header= {title_orig}
          content= {text_orig}
          actions={['Закрыть']}
          />
          <Label icon='globe' content={(name)} />
        </Item.Extra>
      </Item.Content>
    </Item>
    )
}
export default Post