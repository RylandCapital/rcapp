import React from 'react';
import { withRouter } from 'react-router-dom';

import { Drawer, DrawerContent} from '@progress/kendo-react-layout';
import { Button } from '@progress/kendo-react-buttons';


const items =[
  { text: "Financials", icon: 'k-i-inbox', children: null, route: '/' },
  { text: "Diversified Financials", icon: 'k-i-bell', children: null, route: '/2' },
];

class DrawerRouterContainer extends React.Component {
    state = {
        expanded: true,
        selectedId: items.findIndex(x => x.selected === true)
    }

    handleClick = () => {
        this.setState((e) => ({expanded: !e.expanded}));
    }

    onSelect = (e) => {
        this.setState({selectedId: e.itemIndex, expanded: true});
        this.props.history.push(e.itemTarget.props.route);
    }

    setSelectedItem = (pathName) => {
        let currentPath = items.find(item => item.route === pathName);
        if (currentPath.text) {
            return currentPath.text;
        }
    }

    drawerProps = {
        position: 'start',
        mode: 'push',
        mini: true
    }

    render() {
        let selected = this.setSelectedItem(this.props.location.pathname);
        return (
        <div>
             <div className="header">
            <h1>
              <span>
                <Button icon="menu" look="flat" onClick={this.handleClick} />
                <span className="title">
                  The RIA's Technician
                  <span className="divider">|</span>
                  <span className="fund"></span>
                </span>
              </span>
           
            </h1>
          </div>
            <Drawer
                expanded ={this.state.expanded}
                items={items.map(
                (item) => ({ ...item, selected: item.text === selected }))}
                {...this.drawerProps}

                onSelect={this.onSelect}
            >
                <DrawerContent>
                    {this.props.children}
                </DrawerContent>
            </Drawer>
        </div>
        
        );
    }
};

export default withRouter(DrawerRouterContainer);