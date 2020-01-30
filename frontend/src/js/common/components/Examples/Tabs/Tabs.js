import React, { Component } from 'react';
import Tabs, { TabPane } from 'rc-tabs';
import TabContent from 'rc-tabs/lib/TabContent';
import ScrollableInkTabBar from 'rc-tabs/lib/ScrollableInkTabBar';


class ExampleTabs extends Component {
    render() {
        return (
            <div className="py-4">
                <h2>Tabs</h2>
                <div className="row">
                    <div className="mb-4 col-lg-12">
                        <div className="mb-4 card card-small">
                            <div className="border-bottom card-header d-flex justify-content-center">
                                <h3 className="m-0">TAB TOP</h3>
                            </div>
                            <div className="p-0 px-3 pt-3">
                                <Tabs
                                    defaultActiveKey="SEGUNDO_TOP"
                                    tabBarPosition="top"
                                    onChange={this.callback}
                                    renderTabBar={() => <ScrollableInkTabBar />}
                                    renderTabContent={() => <TabContent />}
                                >
                                    <TabPane tab="PRINCIPAL TOP" key="PRINCIPAL_TOP">
                                        <div className="py-4 px-3">
                                            <h2>Why do we use it?</h2>
                                            <p>
                                                It is a long established fact that a reader will be distracted by the
                                                readable content of a page when looking at its layout. The point of using
                                                Lorem Ipsum is that it has a more-or-less normal distribution of letters,
                                                as opposed to using 'Content here, content here',
                                                making it look like readable English. Many desktop
                                                publishing packages and web page editors now use Lorem Ipsum as
                                                their default model text, and a search for 'lorem ipsum' will
                                                uncover many web sites still in their infancy. Various versions have
                                                evolved over the years, sometimes by accident,
                                                sometimes on purpose (injected humour and the like).
                                            </p>
                                        </div>
                                    </TabPane>
                                    <TabPane tab="SEGUNDO TOP" key="SEGUNDO_TOP">
                                        <div className="py-4 px-3">
                                            <h2>What is Lorem Ipsum?</h2>
                                            <p>
                                                It is a long established fact that a reader will be distracted by the
                                                readable content of a page when looking at its layout. The point of using
                                                Lorem Ipsum is that it has a more-or-less normal distribution of letters,
                                                as opposed to using 'Content here, content here',
                                                making it look like readable English. Many desktop
                                                publishing packages and web page editors now use Lorem Ipsum as
                                                their default model text, and a search for 'lorem ipsum' will
                                                uncover many web sites still in their infancy. Various versions have
                                                evolved over the years, sometimes by accident,
                                                sometimes on purpose (injected humour and the like).
                                            </p>
                                        </div>
                                    </TabPane>
                                    <TabPane tab="TERCERO TOP" key="TERCERO_TOP">
                                        <div className="py-4 px-3">
                                            <h2>Where does it come from?</h2>
                                            <p>
                                                It is a long established fact that a reader will be distracted by the
                                                readable content of a page when looking at its layout. The point of using
                                                Lorem Ipsum is that it has a more-or-less normal distribution of letters,
                                                as opposed to using 'Content here, content here',
                                                making it look like readable English. Many desktop
                                                publishing packages and web page editors now use Lorem Ipsum as
                                                their default model text, and a search for 'lorem ipsum' will
                                                uncover many web sites still in their infancy. Various versions have
                                                evolved over the years, sometimes by accident,
                                                sometimes on purpose (injected humour and the like).
                                            </p>
                                        </div>
                                    </TabPane>
                                    <TabPane tab="CUARTO TOP" key="CUARTO_TOP">
                                        <div className="py-4 px-3">
                                            <h2>Where can I get some?</h2>
                                            <p>
                                                It is a long established fact that a reader will be distracted by the
                                                readable content of a page when looking at its layout. The point of using
                                                Lorem Ipsum is that it has a more-or-less normal distribution of letters,
                                                as opposed to using 'Content here, content here',
                                                making it look like readable English. Many desktop
                                                publishing packages and web page editors now use Lorem Ipsum as
                                                their default model text, and a search for 'lorem ipsum' will
                                                uncover many web sites still in their infancy. Various versions have
                                                evolved over the years, sometimes by accident,
                                                sometimes on purpose (injected humour and the like).
                                            </p>
                                        </div>
                                    </TabPane>

                                </Tabs>
                            </div>
                        </div>

                        <div className="mb-4 card card-small">
                            <div className="border-bottom card-header d-flex justify-content-center">
                                <h3 className="m-0">TAB BOTTOM</h3>
                            </div>
                            <div className="p-0 px-3 pt-3">
                                <Tabs
                                    defaultActiveKey="PRINCIPAL_BOTTOM"
                                    tabBarPosition="bottom"
                                    onChange={this.callback}
                                    renderTabBar={() => <ScrollableInkTabBar />}
                                    renderTabContent={() => <TabContent />}
                                    className="mb-4"
                                >
                                    <TabPane tab="PRINCIPAL BOTTOM" key="PRINCIPAL_BOTTOM">
                                        <div className="py-4 px-3">
                                            <h2>What is Lorem Ipsum?</h2>
                                            <p>
                                                It is a long established fact that a reader will be distracted by the
                                                readable content of a page when looking at its layout. The point of using
                                                Lorem Ipsum is that it has a more-or-less normal distribution of letters,
                                                as opposed to using 'Content here, content here',
                                                making it look like readable English. Many desktop
                                                publishing packages and web page editors now use Lorem Ipsum as
                                                their default model text, and a search for 'lorem ipsum' will
                                                uncover many web sites still in their infancy. Various versions have
                                                evolved over the years, sometimes by accident,
                                                sometimes on purpose (injected humour and the like).
                                            </p>
                                        </div>
                                    </TabPane>
                                    <TabPane tab="SEGUNDO BOTTOM" key="SEGUNDO_BOTTOM">
                                        <div className="py-4 px-3">
                                            <h2>Why do we use it?</h2>
                                            <p>
                                                It is a long established fact that a reader will be distracted by the
                                                readable content of a page when looking at its layout. The point of using
                                                Lorem Ipsum is that it has a more-or-less normal distribution of letters,
                                                as opposed to using 'Content here, content here',
                                                making it look like readable English. Many desktop
                                                publishing packages and web page editors now use Lorem Ipsum as
                                                their default model text, and a search for 'lorem ipsum' will
                                                uncover many web sites still in their infancy. Various versions have
                                                evolved over the years, sometimes by accident,
                                                sometimes on purpose (injected humour and the like).
                                            </p>
                                        </div>
                                    </TabPane>
                                    <TabPane tab="TERCERO BOTTOM" key="TERCERO_BOTTOM">
                                        <div className="py-4 px-3">
                                            <h2>Where does it come from?</h2>
                                            <p>
                                                It is a long established fact that a reader will be distracted by the
                                                readable content of a page when looking at its layout. The point of using
                                                Lorem Ipsum is that it has a more-or-less normal distribution of letters,
                                                as opposed to using 'Content here, content here',
                                                making it look like readable English. Many desktop
                                                publishing packages and web page editors now use Lorem Ipsum as
                                                their default model text, and a search for 'lorem ipsum' will
                                                uncover many web sites still in their infancy. Various versions have
                                                evolved over the years, sometimes by accident,
                                                sometimes on purpose (injected humour and the like).
                                            </p>
                                        </div>
                                    </TabPane>
                                    <TabPane tab="CUARTO BOTTOM" key="CUARTO_BOTTOM">
                                        <div className="py-4 px-3">
                                            <h2>Where can I get some?</h2>
                                            <p>
                                                It is a long established fact that a reader will be distracted by the
                                                readable content of a page when looking at its layout. The point of using
                                                Lorem Ipsum is that it has a more-or-less normal distribution of letters,
                                                as opposed to using 'Content here, content here',
                                                making it look like readable English. Many desktop
                                                publishing packages and web page editors now use Lorem Ipsum as
                                                their default model text, and a search for 'lorem ipsum' will
                                                uncover many web sites still in their infancy. Various versions have
                                                evolved over the years, sometimes by accident,
                                                sometimes on purpose (injected humour and the like).
                                            </p>
                                        </div>
                                    </TabPane>

                                </Tabs>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ExampleTabs;
