import React, { Component } from "react";
import { Row, Col, Button, Modal, Container, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Multiselect from "multiselect-react-dropdown";
import EventsService from "../../api/EventsService";

class EditEvents extends Component {
  constructor(props) {
    super(props);
    let search_tags = [];
    let options = [
      { name: "murder" },
      { name: "agri" },
      { name: "flower" },
      { name: "farmer" },
      { name: "money" },
      { name: "tax" },
      { name: "cinema" },
      { name: "film" },
      { name: "dress" },
      { name: "ornaments" },
      { name: "electronics" },
      { name: "sports" },
      { name: "school" },
      { name: "exam" },
      { name: "ness" },
      { name: "iopoiop" },
    ];

    if (this.props.ItemList !== null) {
      this.props.ItemList.search_tags.map((e) => {
        search_tags.push({ name: e });
        options.push({ name: e });
      });
    }
    this.state = {
      value: {
        id: this.props.ItemList ? this.props.ItemList._id : null,
        title: this.props.ItemList ? this.props.ItemList.title : null,
        location: this.props.ItemList ? this.props.ItemList.location : null,
        short_descripton: this.props.ItemList
          ? this.props.ItemList.short_descripton
          : null,
        full_descripton: this.props.ItemList
          ? this.props.ItemList.full_descripton
          : null,
        publish: this.props.ItemList ? this.props.ItemList.publish : null,
        date_added: this.props.ItemList ? this.props.ItemList.date_added : null,
        imgUrl: "",
        fileImg: "",
        fileSize: "",
        multiImgUrl: [],
        multiFileImg: [],
        multiFileSize: "",
        search_tags: this.props.ItemList ? search_tags : [],
        featured_image: this.props.ItemList
          ? this.props.ItemList.featured_image
          : null,
        events_image: this.props.ItemList
          ? this.props.ItemList.events_image
          : [],
      },
      fileError: "",
      multiImgName: this.props.ItemList ? this.props.ItemList.events_image : [],
      selectedValues: search_tags,
      selectedImages: [],
      options: options,
    };
  }

  onSelectFile = (event) => {
    const selectedFiles = event.target.files;
    for (let i = 0; i < selectedFiles.length; i++) {
      let file = event.target.files[i];
      if (file) {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.setState({
            previewImg: reader.result,
            multiFileSize: file.size,
          });
        };
        reader.onerror = function (error) {
          console.log("Error: ", error);
        };

        this.setState({
          value: {
            ...this.state.value,
            multiFileImg: URL.createObjectURL(file),
            multiFileSize: file.size,
          },
          fileError: "",
        });

        let arr = [];
        let multiImgArray = [];
        multiImgArray.push(file.name);
        arr.push(URL.createObjectURL(file));
        this.setState((prevState) => ({
          multiImgName: [...prevState.multiImgName, multiImgArray],
          selectedImages: [...prevState.selectedImages, arr],
        }));
      } else {
        this.setState({
          value: {
            ...this.state.value,
            multiImgUrl: "",
            multiFileImg: "",
            multiFileSize: "",
          },
          fileError: "",
        });
      }
    }
  };

  onChangeHandler = (values) => {
    let name = values.target.name;
    let value = values.target.value;
    this.setState({
      value: {
        ...this.state.value,
        [name]: value,
      },
    });
  };

  fileChangedHandler = (eImg) => {
    let err2 = "Only `.jpg`, `.jpeg`, `.png` files accepted";
    let err3 = "Maximum upload size is 1 MB";
    const errors = {
      fileError: "",
    };
    const icon = eImg.target.files[0];
    let file_size =
      eImg.target.files[0] !== undefined && eImg.target.files[0].size;

    if (icon !== "" || file_size > 1e6) {
      if (icon !== undefined) {
        if (
          icon.name.split(".").pop() !== "jpg" &&
          icon.name.split(".").pop() !== "jpeg" &&
          icon.name.split(".").pop() !== "png"
        ) {
          errors.fileError = err2;

          this.setState({
            ...this.state,
            imgUrl: "",
            fileImg: "",
            ...errors,
          });
          return false;
        } else if (file_size > 1e6) {
          errors.fileError = err3;
          this.setState({
            ...this.state,
            imgUrl: "",
            fileImg: "",
            ...errors,
          });
          return false;
        }
      }
    }

    if (eImg.target.files[0]) {
      let reader = new FileReader();
      reader.readAsDataURL(icon);
      reader.onload = () => {
        this.setState({
          previewImg: reader.result,
          fileSize: file_size,
        });
      };
      reader.onerror = function (error) {
        console.log("Error: ", error);
      };

      this.setState({
        value: {
          ...this.state.value,
          imgUrl: icon,
          fileImg: URL.createObjectURL(eImg.target.files[0]),
          fileSize: file_size,
        },
        fileError: "",
      });
    } else {
      this.setState({
        value: {
          ...this.state.value,
          imgUrl: "",
          fileImg: "",
          fileSize: file_size,
        },
        fileError: "",
      });
    }
  };

  deleteHandler = (image) => {
    this.setState({
      selectedImages: this.state.selectedImages.filter((e) => e !== image),
    });
    URL.revokeObjectURL(image);
  };
  deleteExistImgHandler = (image) => {
    this.setState({
      value: {
        ...this.state.value,
        events_image: this.state.value.events_image.filter((e) => e !== image),
      },
      multiImgName: this.state.multiImgName.filter((e) => e !== image),
    });
  };
  deleteSingleHandler = (image) => {
    URL.revokeObjectURL(image);
  };

  onRemoveHandler = (event) => {
    console.log(event);
  };
  onSelectHandler = (event) => {
    let array = [];
    event.map((e) => array.push(e.name));
    console.log(array);
    this.setState({
      value: {
        ...this.state.value,
        search_tags: array,
      },
    });
  };

  submit = () => {
    let data = this.state.value;
    if (
      data.title !== "" &&
      data.location !== "" &&
      data.full_descripton &&
      data.short_descripton &&
      data.publish !== "" &&
      this.state.multiImgName !== ""
    ) {
      // EventsService.editEvents(this.state.value, this.state.multiImgName);
      this.props.editEvents(data, this.state.multiImgName);
      this.setState({
        value: {
          title: "",
          location: "",
          full_descripton: "",
          short_descripton: "",
          publish: "",
          date_added: "",
          imgUrl: "",
          fileImg: "",
          fileSize: "",
          featured_image: "",
          events_image: "",
        },
        fileError: "",
      });
      this.props.closeEditModel();
    } else {
      toast.error("Please fill all required fields", {
        autoClose: 2000,
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  closeModel = () => {
    this.setState({
      value: {
        title: "",
        location: "",
        publish: "",
        date_added: "",
        imgUrl: "",
        fileImg: "",
        fileSize: "",
        search_tags: [],
        featured_image: "",
        events_image: "",
      },
      fileError: "",
    });
    this.props.closeEditModel();
  };
  render() {
    return (
      <div>
        <Modal
          show={this.props.showEditModel}
          onHide={this.closeModel}
          animation={false}
          size="lg"
          className="detail-ad-cat-Modal"
          backdrop="static"
        >
          <Modal.Header className="mastr-mdl-hd" closeButton>
            <Modal.Title>Edit Events</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Container>
              <Form>
                <Row>
                  <Col lg={6} md={12} sm={12} xs={12}>
                    <Container>
                      <div>
                        <Form.Group>
                          <Form.Label className="mandatoryField">
                            {" "}
                            Title{" "}
                          </Form.Label>
                          <Form.Control
                            type="text"
                            autoComplete="off"
                            name="title"
                            onChange={this.onChangeHandler}
                            value={this.state.value.title}
                          />
                        </Form.Group>
                      </div>
                      <div>
                        <Form.Group>
                          <Form.Label className="mandatoryField">
                            Short Descripton
                          </Form.Label>
                          <Form.Control
                            as="textarea"
                            style={{ resize: "none" }}
                            rows="3"
                            name="short_descripton"
                            autoComplete="off"
                            onChange={this.onChangeHandler}
                            value={this.state.value.short_descripton}
                          />
                        </Form.Group>
                      </div>
                      <div>
                        <Form.Group>
                          <Form.Label className="mandatoryField">
                            Full Descripton
                          </Form.Label>
                          <Form.Control
                            as="textarea"
                            style={{ resize: "none" }}
                            rows="3"
                            name="full_descripton"
                            autoComplete="off"
                            onChange={this.onChangeHandler}
                            value={this.state.value.full_descripton}
                          />
                        </Form.Group>
                      </div>
                      <div>
                        <Form.Group>
                          <Form.Label className="mandatoryField">
                            Featured Image
                          </Form.Label>
                          <Form.Control
                            type="file"
                            onChange={this.fileChangedHandler}
                            accept=".png, .jpg, .jpeg"
                          />
                          <div className="errStyle" style={{ color: "red" }}>
                            {this.state.fileError}
                          </div>
                        </Form.Group>
                      </div>
                      <div className="images">
                        {this.state.fileError === "" ? (
                          this.state.value &&
                          this.state.value.featured_image !== null &&
                          this.state.value.fileSize === "" ? (
                            <div
                              key={this.state.value.fileImg}
                              className="image"
                            >
                              <img
                                src={
                                  "https://tsd.shtdevops.xyz/events/" +
                                  this.state.value.featured_image
                                }
                                height="100"
                                alt=""
                              />
                            </div>
                          ) : this.state.value.fileImg !== "" ? (
                            <div
                              key={this.state.value.fileImg}
                              className="image"
                            >
                              <img
                                src={this.state.value.fileImg}
                                height="100"
                                alt=""
                              />
                            </div>
                          ) : null
                        ) : null}
                      </div>
                    </Container>
                  </Col>
                  <Col lg={6} md={12} sm={12} xs={12}>
                    <Container>
                      <div>
                        <Form.Group>
                          <Form.Label className="mandatoryField">
                            Publish{" "}
                          </Form.Label>
                          <Form.Control
                            type="text"
                            autoComplete="off"
                            name="publish"
                            onChange={this.onChangeHandler}
                            value={this.state.value.publish}
                          />
                        </Form.Group>
                      </div>
                      <div>
                        <Form.Group>
                          <Form.Label className="mandatoryField">
                            Location{" "}
                          </Form.Label>
                          <Form.Control
                            type="text"
                            autoComplete="off"
                            name="location"
                            onChange={this.onChangeHandler}
                            value={this.state.value.location}
                          />
                        </Form.Group>
                      </div>
                      <div>
                        <div>
                          <Form.Group>
                            <Form.Label className="mandatoryField">
                              Search Tags
                            </Form.Label>
                            <div style={{ width: "100%" }}>
                              <Multiselect
                                options={this.state.options}
                                selectedValues={this.state.selectedValues}
                                onSelect={this.onSelectHandler}
                                onRemove={this.onRemoveHandler}
                                displayValue="name"
                                hidePlaceholder={true}
                              />
                            </div>
                          </Form.Group>
                        </div>
                      </div>

                      <div>
                        <Form.Group>
                          <Form.Label className="mandatoryField">
                            Events Images
                          </Form.Label>
                          <Form.Control
                            type="file"
                            onChange={this.onSelectFile}
                            accept=".png, .jpg, .jpeg"
                            multiple
                          />
                          <div className="errStyle" style={{ color: "red" }}>
                            {this.state.fileError}
                          </div>
                        </Form.Group>
                      </div>
                      <div className="images">
                        {this.state.value &&
                        this.state.value.events_image !== null
                          ? this.state.value.events_image.map(
                              (image, index) => {
                                return (
                                  <div key={image} className="image">
                                    <img
                                      src={
                                        "https://tsd.shtdevops.xyz/events/" +
                                        image
                                      }
                                      height="100"
                                      alt=""
                                    />
                                    <button
                                      style={{ width: "10px", padding: 0 }}
                                      onClick={() =>
                                        this.deleteExistImgHandler(image)
                                      }
                                    >
                                      x
                                    </button>
                                  </div>
                                );
                              }
                            )
                          : null}

                        {this.state.selectedImages
                          ? this.state.selectedImages.map((image, index) => {
                              return (
                                <div key={image} className="image">
                                  <img src={image} height="100" alt="" />
                                  <button
                                    style={{ width: "10px", padding: 0 }}
                                    onClick={() => this.deleteHandler(image)}
                                  >
                                    x
                                  </button>
                                </div>
                              );
                            })
                          : null}
                      </div>
                    </Container>
                  </Col>
                </Row>
              </Form>
            </Container>
          </Modal.Body>
          <Modal.Footer className="mastr-mdl-ftr">
            <Button type="submit" onClick={this.submit}>
              Submit
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default EditEvents;
