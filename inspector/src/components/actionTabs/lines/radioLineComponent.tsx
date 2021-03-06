import * as React from "react";
import { Observer, Observable, Nullable } from "babylonjs";

interface IRadioButtonLineComponentProps {
    onSelectionChangedObservable: Observable<RadioButtonLineComponent>,
    label: string,
    isSelected: () => boolean,
    onSelect: () => void
}

export class RadioButtonLineComponent extends React.Component<IRadioButtonLineComponentProps, { isSelected: boolean }> {
    private _onSelectionChangedObserver: Nullable<Observer<RadioButtonLineComponent>>;

    constructor(props: IRadioButtonLineComponentProps) {
        super(props);

        this.state = { isSelected: this.props.isSelected() };
    }

    componentWillMount() {
        this._onSelectionChangedObserver = this.props.onSelectionChangedObservable.add((value) => {
            this.setState({ isSelected: value === this });
        });
    }

    componentWillUnmount() {
        if (this._onSelectionChangedObserver) {
            this.props.onSelectionChangedObservable.remove(this._onSelectionChangedObserver);
            this._onSelectionChangedObserver = null;
        }
    }

    onChange() {
        this.props.onSelect();
        this.props.onSelectionChangedObservable.notifyObservers(this);
    }

    render() {
        return (
            <div className="radioLine">
                <div className="label">
                    {this.props.label}
                </div>
                <div className="radioContainer">
                    <input id={this.props.label} className="radio" type="radio" checked={this.state.isSelected} onChange={() => this.onChange()} />
                    <label htmlFor={this.props.label} className="labelForRadio" />
                </div>
            </div>
        );
    }
}
